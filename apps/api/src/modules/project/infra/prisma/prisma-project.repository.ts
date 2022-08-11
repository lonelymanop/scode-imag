import {PrismaClient, Project} from '@codeimage/prisma-models';
import {
  ProjectCreateRequest,
  ProjectCreateResponse,
  ProjectUpdateRequest,
  ProjectUpdateResponse,
} from '../../domain';
import {ProjectRepository} from '../../repository';

export function makePrismaProjectRepository(
  client: PrismaClient,
): ProjectRepository {
  function findById(id: string): Promise<Project | null> {
    return client.project.findFirst({
      where: {
        id,
      },
      include: {
        editorTabs: true,
        terminal: true,
        editorOptions: true,
        frame: true,
      },
    });
  }

  function findAllByUserId(userId: string): Promise<Project[]> {
    return client.project.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        editorOptions: true,
        terminal: true,
        editorTabs: true,
        frame: true,
      },
    });
  }

  function deleteProject(id: string, userId: string): Promise<Project> {
    return client.project.delete({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
    });
  }

  function createNewProject(
    userId: string,
    data: ProjectCreateRequest,
  ): Promise<ProjectCreateResponse> {
    return client.project.create({
      data: {
        name: 'Untitled',
        user: {
          connect: {id: userId},
        },
        editorTabs: {
          createMany: {
            data: data.editors,
          },
        },
        editorOptions: {
          create: {
            fontId: data.editorOptions.fontId,
            fontWeight: data.editorOptions.fontWeight,
            showLineNumbers: data.editorOptions.showLineNumbers,
            themeId: data.editorOptions.themeId,
          },
        },
        frame: {
          create: {
            background: data.frame.background,
            opacity: data.frame.opacity,
            radius: data.frame.radius,
            padding: data.frame.padding,
            visible: data.frame.visible,
          },
        },
        terminal: {
          create: {
            accentVisible: data.terminal.accentVisible,
            alternativeTheme: data.terminal.alternativeTheme,
            background: data.terminal.background,
            opacity: data.terminal.opacity,
            shadow: data.terminal.shadow,
            showGlassReflection: data.terminal.showGlassReflection,
            showHeader: data.terminal.showHeader,
            showWatermark: data.terminal.showWatermark,
            textColor: data.terminal.textColor,
            type: data.terminal.type,
          },
        },
      },
      include: {
        editorOptions: true,
        editorTabs: true,
        frame: true,
        terminal: true,
      },
    });
  }

  async function updateProject(
    userId: string,
    projectId: string,
    data: ProjectUpdateRequest,
  ): Promise<ProjectUpdateResponse> {
    return client.project.update({
      where: {
        id: projectId,
      },
      data: {
        editorTabs: {
          deleteMany: {
            NOT: {
              id: {
                in: data.editors.map(({id}) => id),
              },
            },
          },
          upsert: data.editors.map(editor => {
            const {languageId, code, tabName} = editor;
            return {
              where: {
                id: editor.id,
              },
              create: {
                code,
                tabName,
                languageId,
              },
              update: {
                code,
                tabName,
                languageId,
              },
            };
          }),
        },
        editorOptions: {
          update: {
            fontId: data.editorOptions.fontId,
            fontWeight: data.editorOptions.fontWeight,
            showLineNumbers: data.editorOptions.showLineNumbers,
            themeId: data.editorOptions.themeId,
          },
        },
        frame: {
          update: {
            background: data.frame.background,
            opacity: data.frame.opacity,
            radius: data.frame.radius,
            padding: data.frame.padding,
            visible: data.frame.visible,
          },
        },
        terminal: {
          update: {
            accentVisible: data.terminal.accentVisible,
            alternativeTheme: data.terminal.alternativeTheme,
            background: data.terminal.background,
            opacity: data.terminal.opacity,
            shadow: data.terminal.shadow,
            showGlassReflection: data.terminal.showGlassReflection,
            showHeader: data.terminal.showHeader,
            showWatermark: data.terminal.showWatermark,
            textColor: data.terminal.textColor,
            type: data.terminal.type,
          },
        },
      },
      include: {
        editorOptions: true,
        editorTabs: true,
        frame: true,
        terminal: true,
      },
    });
  }

  async function updateProjectName(projectId: string, name: string) {
    return client.project.update({
      data: {
        name,
      },
      where: {
        id: projectId,
      },
    });
  }

  return {
    findById,
    updateProjectName,
    findAllByUserId,
    createNewProject,
    updateProject,
    deleteProject,
  };
}