import { withActions, decorate } from '@storybook/addon-actions';

const pickTarget = decorate([args => [args[0].target]]);

const button = () => `<button type="button">Hello World</button>`;

export default {
  title: 'Addons|Actions',
};

export const story1 = () => withActions('click')(button);
story1.title = 'Hello World';
export const story2 = () => withActions('click', 'contextmenu')(button);
story2.title = 'Multiple actions';

export const story3 = () =>
  withActions('click', 'contextmenu', { clearOnStoryChange: false })(button);
story3.title = 'Multiple actions + config';

export const story4 = () => withActions({ click: 'clicked', contextmenu: 'right clicked' })(button);
story4.title = 'Multiple actions, object';

export const story5 = () =>
  withActions({ 'click .btn': 'clicked', contextmenu: 'right clicked' })(
    () => `
        <div>
          Clicks on this button will be logged: <button class="btn" type="button">Button</button>
        </div>
      `
  );
story5.title = 'Multiple actions, selector';

export const story6 = () =>
  withActions({ click: 'clicked', contextmenu: 'right clicked' }, { clearOnStoryChange: false })(
    button
  );
story6.title = 'Multiple actions, object + config';

export const story7 = () => pickTarget.withActions('click', 'contextmenu')(button);
story7.title = 'Decorated actions';

export const story8 = () =>
  pickTarget.withActions('click', 'contextmenu', { clearOnStoryChange: false })(button);
story8.title = 'Decorated actions + config';
