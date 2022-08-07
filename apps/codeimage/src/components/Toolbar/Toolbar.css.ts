import {createTheme, style} from '@vanilla-extract/css';
import {themeVars} from '@codeimage/ui';

export const [toolbarTheme, toolbarVars] = createTheme({
  backgroundColor: themeVars.backgroundColor.white,
  toolbarHeight: '56px',
});

export const wrapper = style([
  toolbarTheme,
  {
    padding: `0px ${themeVars.spacing['3']}`,
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    zIndex: 30,
    height: toolbarVars.toolbarHeight,
    width: '100%',
    backgroundColor: themeVars.dynamicColors.panel.background,
    color: themeVars.dynamicColors.panel.textColor,
    borderBottom: `1px solid ${themeVars.dynamicColors.divider}`,
    paddingLeft: themeVars.spacing['4'],
    paddingRight: themeVars.spacing['4'],

    '@media': {
      'screen and (max-width: 768px)': {
        height: `calc(${toolbarVars.toolbarHeight} + env(safe-area-inset-top, 0))`,
        paddingTop: `env(safe-area-inset-top, 0)`,
      },
    },
  },
]);

export const title = style({});

export const actionBox = style({
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'row',
  flex: '1',
  alignItems: 'center',
  columnGap: themeVars.spacing['3'],
});
