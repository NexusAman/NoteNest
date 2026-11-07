import { useState } from "react";
import { Check, Copy } from "lucide-react";

type ParagraphBlock = { type: "paragraph"; text: string };
type HeadingBlock = { type: "heading"; text: string };
type BulletBlock = { type: "bullets"; items: string[] };
type CodeBlock = { type: "code"; code: string };
type TasksBlock = {
  type: "tasks";
  items: { checked: boolean; text: string; index: number }[];
};

type NoteBlock =
  | ParagraphBlock
  | HeadingBlock
  | BulletBlock
  | CodeBlock
  | TasksBlock;

interface NoteContentProps {
  content: string;
  onToggleTask?: (taskIndex: number) => void;
}

const taskPattern = /^- \[([ xX])\]\s+(.*)$/;

function parseNoteContent(content: string): NoteBlock[] {
  const blocks: NoteBlock[] = [];
  const parts = content.split("```");
  let taskCount = 0;

  parts.forEach((part, index) => {
    if (index % 2 === 1) {
      blocks.push({ type: "code", code: stripFenceLanguage(part) });
      return;
    }

    parseText(part, blocks, () => taskCount++);
  });

  return blocks;
}

function stripFenceLanguage(raw: string) {
  const trimmed = raw.replace(/^\n/, "").replace(/\n$/, "");
  const newline = trimmed.indexOf("\n");
  if (newline === -1) return trimmed;
  const firstLine = trimmed.slice(0, newline).trim();
  if (/^[\w-]*$/.test(firstLine)) return trimmed.slice(newline + 1);
  return trimmed;
}

function parseText(
  source: string,
  blocks: NoteBlock[],
  nextTaskIndex: () => number,
) {
  let paragraph: string[] = [];
  let bullets: string[] = [];
  let tasks: TasksBlock["items"] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({ type: "paragraph", text: paragraph.join("\n") });
    paragraph = [];
  };

  const flushBullets = () => {
    if (bullets.length === 0) return;
    blocks.push({ type: "bullets", items: bullets });
    bullets = [];
  };

  const flushTasks = () => {
    if (tasks.length === 0) return;
    blocks.push({ type: "tasks", items: tasks });
    tasks = [];
  };

  const flush = () => {
    flushParagraph();
    flushBullets();
    flushTasks();
  };

  source.split("\n").forEach((line) => {
    const task = line.match(taskPattern);
    if (task) {
      flushParagraph();
      flushBullets();
      tasks.push({
        checked: task[1].toLowerCase() === "x",
        text: task[2],
        index: nextTaskIndex(),
      });
      return;
    }

    if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "heading", text: line.slice(3).trim() });
      return;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      flushTasks();
      bullets.push(line.slice(2));
      return;
    }

    if (line.trim() === "") {
      flush();
      return;
    }

    flushBullets();
    flushTasks();
    paragraph.push(line);
  });

  flush();
}

export function NoteContent({ content, onToggleTask }: NoteContentProps) {
  const blocks = parseNoteContent(content);

  return (
    <div className="space-y-4 text-[15px] leading-7 text-[#334155]">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2
              key={index}
              className="pt-1 text-lg font-bold tracking-tight text-[#0F172A]"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "code") {
          return <CodeBlock key={index} code={block.code} />;
        }

        if (block.type === "tasks") {
          return (
            <ul key={index} className="space-y-3">
              {block.items.map((item) => (
                <li key={item.index}>
                  <button
                    type="button"
                    onClick={() => onToggleTask?.(item.index)}
                    className="flex items-start gap-3 text-left"
                  >
                    <span
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[5px] ${
                        item.checked
                          ? "bg-[#0866F5] text-white"
                          : "border border-[#CBD5E1] bg-white text-transparent"
                      }`}
                    >
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    <span>{item.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "bullets") {
          return (
            <ul key={index} className="list-disc space-y-1 pl-5">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="whitespace-pre-line">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-xl bg-[#F4F1FF] px-4 py-3.5 pr-12 text-[13px] leading-6 text-[#E11D48]">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-md text-[#94A3B8] transition hover:bg-white/70 hover:text-[#64748B]"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}
