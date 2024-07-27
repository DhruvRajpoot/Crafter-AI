import { Copy } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownRenderer = ({ message }: { message: { content: string } }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };

  const extractCodeText = (children: React.ReactNode): string => {
    if (typeof children === "string") {
      return children;
    }

    if (Array.isArray(children)) {
      return children.map((child) => extractCodeText(child)).join("");
    }

    if (React.isValidElement(children) && children.props.children) {
      return extractCodeText(children.props.children);
    }

    return "";
  };

  return (
    <div className="text-sm overflow-hidden leading-7 prose prose-sm prose-headings:font-semibold prose-headings:text-gray-800 relative">
      <ReactMarkdown
        components={{
          pre: ({ node, ...props }) => {
            const codeText = extractCodeText(props.children);

            return (
              <div className="relative overflow-auto w-full bg-gray-800 text-white px-2 rounded-lg mb-4">
                <div className="w-full pt-2">
                  <button
                    className="w-fit ml-auto flex items-center gap-1.5 text-xs text-gray-300 bg-gray-700 px-2 py-0.5 rounded-sm active:bg-gray-600"
                    onClick={() => {
                      copyToClipboard(codeText);
                    }}
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                <pre {...props} />
              </div>
            );
          },
          code: ({ node, className, children, ...props }) => {
            const language = className?.replace("language-", "") || "plaintext";
            return (
              <SyntaxHighlighter
                language={language}
                style={coldarkDark}
                PreTag="div"
                {...(props as any)}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
          a: ({ node, ...props }) => (
            <a
              className="text-blue-500 hover:underline"
              {...props}
              target="_blank"
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-400 pl-4 italic text-gray-600 mb-4"
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside ml-4 mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside ml-4 mb-4" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 first:mt-0" {...props} />
          ),
          h1: ({ node, ...props }) => (
            <h1
              className="text-3xl font-bold mb-4 mt-6 first:mt-0"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-2xl font-bold mb-3 mt-5 first:mt-0"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-bold mb-2 mt-4 first:mt-0" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-lg font-bold mb-1 mt-3 first:mt-0" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="text-md font-bold mb-1 mt-2 first:mt-0" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="text-sm font-bold mb-1 mt-2 first:mt-0" {...props} />
          ),
        }}
      >
        {message.content || ""}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
