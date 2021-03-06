import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";
import { LIGHT_BLUE, LINK_BLUE, LIST_BACKGROUND } from "../themes/themes";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Collapse, Icon } from "@mui/material";
import { useCurrentContent } from "../state/hooks";
import {
  helloworld,
  createRepo,
  forkRepo,
  learningResources,
  githubFlow,
} from "./chapters-content/getting-started";
import {
  deployingWithGit,
  trainingandeducation,
  whatisheroku,
} from "./chapters-content/heroku";
import { deployingNode } from "./chapters-content/heroku/deployingNode";
import {
  actions,
  alarms,
  bots,
  opLanguage,
  whatIsShoreline,
} from "./chapters-content/shoreline";

type ChaptersProps = {};

const CHAPTERS = [
  {
    name: "Github",
    expandable: true,
    subchapters: [
      {
        name: "Hello World",
        content: helloworld,
      },
      { name: "Create a repo", content: createRepo },
      { name: "Fork a repo", content: forkRepo },
      { name: "Github flow", content: githubFlow },
      { name: "Learning resources", content: learningResources },
    ],
  },
  {
    name: "Heroku",
    expandable: true,
    subchapters: [
      { name: "What is Heroku", content: whatisheroku },
      { name: "Deploying with Git", content: deployingWithGit },
      { name: "Deploying Node.js Apps", content: deployingNode },
      { name: "Training and Education", content: trainingandeducation },
    ],
  },
  {
    name: "Shoreline",
    expandable: true,
    subchapters: [
      { name: "What is Shoreline", content: whatIsShoreline },
      { name: "Alarms", content: alarms },
      { name: "Bots", content: bots },
      { name: "Actions", content: actions },
      { name: "Op Language", content: opLanguage },
    ],
  },
  { name: "DevOpsverse", disabled: true },
  { name: "About", disabled: true },
];

export const Chapters: React.FC<ChaptersProps> = ({}) => {
  const [collapseChapter, setCollapseChapter] = useState(0);
  const [selectedSubchapter, setSelectedSubchapter] = useState(0);
  const setCurrentContent = useCurrentContent().set;

  const handleCollapseChapter = (index: number) => {
    if (index === collapseChapter) {
      setCollapseChapter(-1);
      return;
    }
    setCollapseChapter(index);
  };

  const handleSelectSubChapter = (index: number) => {
    setSelectedSubchapter(index);
    setCurrentContent(
      CHAPTERS[collapseChapter]?.subchapters?.[index].content ?? null
    );
  };

  return (
    <List>
      {CHAPTERS.map(({ expandable, name, subchapters, disabled }, index) => (
        <Box key={index}>
          <Box pt={4}>
            <ListItem
              sx={{
                borderRadius: 2,
                cursor: "pointer",
                "&.Mui-selected": {
                  backgroundColor: LIST_BACKGROUND,
                },
                "&:hover": {
                  color: LIGHT_BLUE,
                  backgroundColor: LIST_BACKGROUND,
                },
              }}
              disabled={disabled}
              onClick={() => handleCollapseChapter(index)}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Typography variant="h2">{name}</Typography>
                {expandable && (
                  <Icon
                    sx={
                      collapseChapter !== index
                        ? {
                            transform: "rotate(-90deg)",
                            mr: 1,
                          }
                        : null
                    }
                  >
                    <KeyboardArrowDownIcon
                      fontSize="small"
                      style={{
                        fill: LINK_BLUE,
                      }}
                    />
                  </Icon>
                )}
              </Box>
            </ListItem>
            <Box pt={4}>
              <Divider />
            </Box>
          </Box>
          <Collapse
            in={expandable && collapseChapter === index}
            timeout="auto"
            unmountOnExit={true}
          >
            {subchapters?.map(({ name }, index) => (
              <List>
                <Box key={index} pt={2}>
                  <ListItem
                    sx={{
                      py: 1,
                      px: 4,
                      borderRadius: 2,
                      cursor: "pointer",
                      "&.Mui-selected": {
                        backgroundColor: LIST_BACKGROUND,
                      },
                      "&:hover": {
                        color: LIGHT_BLUE,
                        backgroundColor: LIST_BACKGROUND,
                      },
                    }}
                    selected={index === selectedSubchapter}
                    onClick={() => handleSelectSubChapter(index)}
                  >
                    <Typography variant="subtitle1">{name}</Typography>
                  </ListItem>
                </Box>
              </List>
            ))}
          </Collapse>
        </Box>
      ))}
    </List>
  );
};
