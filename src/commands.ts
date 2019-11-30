import { getFilePath } from './path';
import { showDiff, showNotSupported } from './webview';
import { getGitSides, getExplorerSides } from './content';
import { getActiveDiffPanelWebview } from './webview/store';
import { commands, window, Uri, ExtensionContext } from 'vscode';

export function init(context: ExtensionContext) {
  commands.registerCommand('diffMerge.scm.file', gitDiff);
  commands.registerCommand('diffMerge.chooseFile', fileDiff);
  commands.registerCommand('diffMerge.nextDiff', nextDiff);
  commands.registerCommand('diffMerge.prevDiff', prevDiff);

  function gitDiff(e: {original: Uri}) {
    try {
      const rightPath = getFilePath(e.original.fsPath);
      const { leftContent, rightContent } = getGitSides(rightPath);
      if (rightContent) {
        showDiff({ leftContent, rightContent, rightPath, context });
      } else {
        showNotSupported(context, rightPath);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fileDiff(e: Uri) {
    const file = await window.showOpenDialog({});
    if (file) {
      const { fsPath: leftPath } = file[0];
      const { fsPath: rightPath } = e;

      const { leftContent, rightContent } = getExplorerSides(leftPath, rightPath);
      showDiff({ leftContent, rightContent, leftPath, rightPath, context });
    }
  }

  function nextDiff() {
    const webview = getActiveDiffPanelWebview();
    webview.api.sendNextDiff();
  }

  function prevDiff() {
    const webview = getActiveDiffPanelWebview();
    webview.api.sendPrevDiff();
  }
}