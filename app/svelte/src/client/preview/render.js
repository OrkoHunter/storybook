import { document } from 'global';
import { stripIndents } from 'common-tags';

function mountView({ Component, target, data, on, Wrapper, WrapperData }) {
  let component;

  if (Wrapper) {
    const fragment = document.createDocumentFragment();
    component = new Component({ target: fragment, data });
    /* eslint-disable-next-line no-new */
    new Wrapper({
      target,
      slots: { default: fragment },
      data: WrapperData || {},
    });
  } else {
    component = new Component({ target, data });
  }

  if (on) {
    // Attach svelte event listeners.
    Object.keys(on).forEach(eventName => {
      component.on(eventName, on[eventName]);
    });
  }
}

export default function render({
  story,
  selectedKind,
  selectedStory,
  showMain,
  showError,
  // showException,
}) {
  const {
    /** @type {SvelteComponent} */
    Component,
    /** @type {any} */
    data,
    /** @type {{[string]: () => {}}} Attach svelte event handlers */
    on,
    Wrapper,
    WrapperData,
  } = story();

  const target = document.getElementById('root');

  target.innerHTML = '';

  if (!Component) {
    showError({
      title: `Expecting a Svelte component from the story: "${selectedStory}" of "${selectedKind}".`,
      description: stripIndents`
        Did you forget to return the Svelte component configuration from the story?
        Use "() => ({ Component: YourComponent, data: {} })"
        when defining the story.
      `,
    });

    return;
  }

  mountView({ Component, target, data, on, Wrapper, WrapperData });

  showMain();
}
