import { ExtensionContext, workspace } from 'coc.nvim';
import { FloatWindow } from './lib/floatwindow';


export async function activate(context: ExtensionContext): Promise<void> {
  let { subscriptions } = context

  let output = workspace.createOutputChannel('coc-status')

  const floatWin = new FloatWindow(workspace.nvim, 60, 1000, output)

  subscriptions.push(floatWin)

  subscriptions.push(
    workspace.registerAutocmd({
      event: ['User', 'CocStatusChange'],
      request: false,
      callback: async () => {
        const newStatus = (await workspace.nvim.getVar('coc_status') as string || '').trim()
        floatWin.show(newStatus)
      }
    })
  )
}
