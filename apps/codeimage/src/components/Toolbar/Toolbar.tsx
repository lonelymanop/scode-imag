import {getAuth0State} from '@codeimage/store/auth/auth0';
import {Box, Button, HStack} from '@codeimage/ui';
import {Link} from 'solid-app-router';
import {Component, Show} from 'solid-js';
import {CodeImageLogo} from '../Icons/CodeImageLogo';
import {CollectionIcon} from '../Icons/Collection';
import {sidebarLogo} from '../Scaffold/Sidebar/Sidebar.css';
import {UserAuth0} from '../UserBadge/UserAuth0';
import {UserBadge} from '../UserBadge/UserBadge';
import {ExportButton} from './ExportButton';
import {ExportInNewTabButton} from './ExportNewTabButton';
import * as styles from './Toolbar.css';
import {ToolbarSettingsButton} from './ToolbarSettings';
import {ToolbarSnippetName} from './ToolbarSnippetName';

export const Toolbar: Component<{
  canvasRef: HTMLElement | undefined;
}> = props => {
  const loggedIn = () => getAuth0State().loggedIn();
  // const loggedInAuth0 = async () =>
  //   auth0.loginWithPopup().then((data: any) => console.log('test', data));
  // const logout = () => auth0.logout();
  // const user = async () => {
  //   const user = await auth0.getUser();
  //   console.log('check in arrow', user);
  //   return user;
  // };
  // console.log('user', user());
  return (
    <div class={styles.wrapper}>
      <ToolbarSettingsButton />
      <Box display={'flex'} alignItems={'center'} marginLeft={5}>
        <div class={sidebarLogo}>
          <CodeImageLogo width={'140px'} />
        </div>
        <Show when={loggedIn()}>
          <Box marginLeft={16}>
            <Button
              as={Link}
              href={'/dashboard'}
              variant={'link'}
              theme={'secondary'}
            >
              <CollectionIcon />
              <Box marginLeft={2}>Dashboard</Box>
            </Button>
          </Box>
        </Show>
      </Box>

      <div class={styles.toolbarSnippetBox}>
        <ToolbarSnippetName />
      </div>

      <Box class={styles.actionBox} style={{flex: 1}}>
        <HStack marginLeft={'auto'} spacing={'2'}>
          <ExportInNewTabButton canvasRef={props.canvasRef} />

          <ExportButton canvasRef={props.canvasRef} />

          {/* <Button onClick={loggedInAuth0}>LOGIN</Button>
          <Button onClick={logout}>logout</Button> */}
          <UserAuth0 />
          <UserBadge />
        </HStack>
      </Box>
    </div>
  );
};
