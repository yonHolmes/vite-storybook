import { ReactNode, useState } from "react";

/*
Configurations:
  - Letter/Label
  - Icon
  - Default to Ellipsis
  - Icon + Label
  - Label + Icon

Define a Label prop (covers words and letter)
Define a Left/Right Icon prop
Define a Color Prop for Text
Define a Fill Prop for Background
Define onClick handler (changes UI if so)
*/

// https://medium.com/@steve.alves2/how-to-type-hex-colors-in-typescript-3c3b9a32baa7
// Primitive String Check
type HexCode = `#${string}`;

type ClickEvent = React.MouseEvent<Element, MouseEvent>;

interface PropsMoodlet {
  label?: string,
  leftIcon?: ReactNode,
  rightIcon?: ReactNode,

  // Dependent on HexCode as we add Opacity to it
  fill?: HexCode,
  color?: string,
  border?: string,
  fontSize?: FontSize,
  onClick?: (event: ClickEvent) => void,
  onContextMenu?: (event: ClickEvent) => void,
}

type SpanStyle = React.CSSProperties;
type FontSize = SpanStyle["fontSize"];

function makeProps(props: PropsMoodlet) {
  const isClickable = !!props.onClick;
  return {
    // Status ARIA role felt like a good choice
    // https://www.w3.org/TR/wai-aria/#status
    role: isClickable ? 'button' : 'status',
    
    // Going to assume readable, but not focusable if not clickable
    tabIndex: isClickable ? 0 : -1,
  }
}

function makeStyles(isHover: boolean, props: PropsMoodlet): React.CSSProperties  {
  const isClickable = !!props.onClick;
  const baseStyle = {
    display: 'flex',
    flexDirection: 'row' as React.CSSProperties["flexDirection"],
    alignItems: 'center',
    justifyContent: 'space-around',
    fontFamily: 'Public Sans',
    fontWeight: 'bold', // optional?
    minWidth: '1em',

    cursor: isClickable ? 'pointer' : 'default',
    
    color: props.color,
    fontSize: props.fontSize,
    padding: '2px 4px 2px 4px',
    borderRadius: '999px',

    ...(
      // Add these styles, if fill is defined
      props.fill ? {
        border: props.border ?? `1px solid ${props.fill}`,
        // We know this is a hexcode prior, so we work with it as a string now
        backgroundColor: props.fill as string,
      } : {}
    )
  };

  if (!props.onClick && props.fill) {
    // Component is Read-Only, so apply 90% tranparancy
    const alpha = alphaToHex(Math.round(255 * 0.15));
    baseStyle.backgroundColor += alpha;

    baseStyle.color = props.fill;
  } else {
    if (isHover) {
      baseStyle.backgroundColor = LightenDarkenColor(
        baseStyle.backgroundColor as HexCode,
        -25
      );
    }
  }

  console.log('baseStyle', baseStyle);
  return baseStyle;
}

export function Moodlet(props: PropsMoodlet) {
  console.log('PropsMoodlet', props);
  // Hover Style approach from https://stackabuse.com/how-to-style-hover-in-react/
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };

  const styles = makeStyles(isHover, props);
  const computedProps = makeProps(props);
  return (
      <span
        {...computedProps}
        onClick={props.onClick}
        onContextMenu={props.onContextMenu}
        style={styles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {props.leftIcon}
        {props.label &&
        <span
          style={{
            paddingLeft: props.leftIcon ? '8px' : '0',
            // Always apply Right Padding for space if no icon
            paddingRight: props.rightIcon ? '8px' : '4px',
          }}
        >
          {props.label}
        </span>}
        {props.rightIcon}
      </span>
  );
}

// https://css-tricks.com/8-digit-hex-codes/
/*
This could be replaced with a Lib/put into a "helpers" folder as desired
(Replaced substr with slice)
*/
function alphaToHex(alpha: number /* 0 - 255 */) {
  return (alpha + 0x10000).toString(16).slice(-2).toUpperCase();;
}

// https://css-tricks.com/snippets/javascript/lighten-darken-color/
/*
This could be replaced with a Lib/put into a "helpers" folder as desired
*/
function LightenDarkenColor(hexCol: HexCode, amt: number) {
  let usePound = false;

  let col = hexCol as string;
  if (col[0] == "#") {
      col = col.slice(1) ;
      usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  let b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  let g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}