import classNames from 'classnames';
import { forwardRef, HTMLProps } from 'react';

/**
 * Google Material icon, using the font.
 */

type IconName = 'keyboard_arrow_up' | 'keyboard_arrow_down';

const MaterialIcon = forwardRef<
  HTMLSpanElement,
  HTMLProps<HTMLSpanElement> & { iconName: IconName }
>(function MaterialIcon(props, ref) {
  return (
    <span
      {...{ ref }}
      {...props}
      className={classNames('material-icons', props.className)}
    >
      {props.iconName}
    </span>
  );
});

export default MaterialIcon;
