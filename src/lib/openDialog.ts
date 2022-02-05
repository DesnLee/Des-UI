import { createApp, h } from 'vue';
import Dialog from './Dialog.vue';

interface Options {
  title?: String,
  content?: String,
  ok?: Function,
  cancel?: Function,
  closeOnOverlay?: Boolean
}

export const openDialog = (options: Options) => {
  let { title, content, ok, cancel, closeOnOverlay } = options;
  title = title ? title : 'Dialog 默认标题';
  content = content ? content : 'Dialog 默认内容';
  ok = ok ? ok : () => {console.log('Dialog - 默认ok');};
  cancel = cancel ? cancel : () => {console.log('Dialog - 默认cancel');};

  const container = document.createElement('div');
  document.body.appendChild(container);

  const close = () => {
    app.unmount();
    container.remove();
  };

  const app = createApp({
    render() {
      return h(
        Dialog,
        {
          closeOnOverlay,
          visible: true,
          'onUpdate:visible': (vis: Boolean) => {
            if (!vis) {
              close();
            }
          },
          cancel,
          ok
        },
        {
          title,
          content
        }
      );
    }
  });
  app.mount(container);
};
