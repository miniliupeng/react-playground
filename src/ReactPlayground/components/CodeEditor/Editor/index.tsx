import MonacoEditor, { OnMount, EditorProps } from "@monaco-editor/react";
import { createATA } from "./ata";

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface Props {
  file: EditorFile;
  onChange?: EditorProps["onChange"];
  options?: EditorProps["options"];
}

export default function Editor({ file, onChange, options }: Props) {
  const handleEditorMount: OnMount = (editor, monaco) => {
    // 格式化快捷键
    // editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
    //   editor.getAction("editor.action.formatDocument")?.run();
    //   // editor.getSupportedActions().map((a) => a.id); // 获取所有支持的action
    // });

    // ts 配置
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve, //"preserve": 输入 <div> 输出 <div>;  "react" 输出 React.createElement("div")
      esModuleInterop: true, // TypeScript 会自动为 CommonJS 模块创建默认导出（default），使其更符合 ES 模块的语法
    });

    // 自动获取类型提示
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    // 开始获取一次类型，然后内容改变之后获取一次类型，获取类型之后用 addExtraLib 添加到 ts 里
    editor.onDidChangeModelContent(() => {
      console.log(editor.getValue());
      
      ata(editor.getValue());
    });

    ata(editor.getValue());

    // TODO: 智能提示，自动补全
    // monaco.languages.registerCompletionItemProvider("typescript", {
    //   provideCompletionItems: () => {
    //     return {
    //       suggestions: [
    //         {
    //           label: "ComponentName",
    //           kind: monaco.languages.CompletionItemKind.Function,
    //           insertText: "ComponentName",
    //           detail: "Add import { ComponentName } from 'module-name';",
    //           command: {
    //             id: "editor.action.insertSnippet",
    //             title: "Insert Import",
    //             arguments: [`import { ComponentName } from 'module-name';\n`],
    //           },
    //         },
    //       ],
    //     };
    //   },
    // });
  };
  
  return (
    <MonacoEditor
      height={"100%"}
      path={file.name}
      language={file.language}
      onMount={handleEditorMount}
      onChange={onChange}
      value={file.value}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false, // 最后一行之后依然可以滚动一屏
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  );
}
