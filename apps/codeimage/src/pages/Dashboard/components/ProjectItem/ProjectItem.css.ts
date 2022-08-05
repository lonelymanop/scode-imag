import {themeVars} from '@codeimage/ui';
import {style} from '@vanilla-extract/css';

export const item = style({
  backgroundColor: themeVars.dynamicColors.input.backgroundColor,
  width: '100%',
  borderRadius: themeVars.borderRadius.sm,
  padding: '24px',
  paddingBottom: '12px',
  boxShadow: themeVars.dynamicColors.dialog.panelShadow,
  color: themeVars.dynamicColors.textColor,
  transition: 'background-color 0.2s ease-in-out',
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'column',
  ':hover': {
    backgroundColor: themeVars.dynamicColors.listBox.hoverBackgroundColor,
  },
  selectors: {
    '[data-displayMode="grid"] &': {
      height: '128px',
    },
    '[data-displayMode="list"] &': {
      height: '64px',
      paddingTop: 0,
      paddingBottom: 0,
      alignItems: 'center',
    },
  },
});

export const projectInfo = style({
  fontWeight: 300,
  color: themeVars.dynamicColors.descriptionTextColor,
  marginTop: 'auto',
});

export const projectLanguages = style({
  color: themeVars.dynamicColors.descriptionTextColor,
});

export const itemLink = style({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  outline: 'none',
});

export const itemTitle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
