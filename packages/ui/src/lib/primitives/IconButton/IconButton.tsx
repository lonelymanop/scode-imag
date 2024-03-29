import {ElementType} from '@solid-aria/types';
import clsx from 'clsx';
import {ParentProps} from 'solid-js';
import {omitProps} from 'solid-use/props';
import {Button, ButtonProps} from '../Button/Button';
import * as styles from './IconButton.css';

export function IconButton<T extends ElementType = 'button'>(
  props: ParentProps<ButtonProps<T>>,
) {
  const classes = () =>
    clsx(styles.iconButton({size: props.size}), props.class);

  return (
    // @ts-expect-error not valid type with TS>5.0
    <Button {...omitProps(props, ['class', 'children'])} class={classes()}>
      {props.children}
    </Button>
  );
}
