import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { LogViewer } from '@patternfly/react-log-viewer';
import {
  Button,
  Card,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import { OutlinedPlayCircleIcon, PauseIcon, PlayIcon } from '@patternfly/react-icons';

interface RuleBookLogProps {
  lines: string[];
  isLoading: boolean;
}
const RulebookLog: FunctionComponent<RuleBookLogProps> = (props) => {
  const { lines, isLoading } = props;
  const [isPaused, setIsPaused] = useState(false);
  const [currentItemCount, setCurrentItemCount] = useState(lines.length);
  const [renderData, setRenderData] = React.useState<string[]>(lines);
  const [linesBehind, setLinesBehind] = React.useState(0);
  const logViewerRef = useRef<any>();

  useEffect(() => {
    if (!isPaused && lines.length > 0) {
      setCurrentItemCount(lines.length);
      setRenderData(lines);
      if (logViewerRef && logViewerRef.current) {
        logViewerRef.current.scrollToBottom();
      }
    } else if (lines.length !== currentItemCount) {
      setLinesBehind(lines.length - currentItemCount);
    } else {
      setLinesBehind(0);
    }
  }, [lines, isPaused, currentItemCount]);

  const onScroll = ({ scrollOffsetToBottom, scrollUpdateWasRequested }) => {
    if (!scrollUpdateWasRequested) {
      if (Math.floor(scrollOffsetToBottom) > 0) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    }
  };

  const ControlButton = () => (
    <Button
      variant={isPaused ? 'plain' : 'link'}
      onClick={() => {
        setIsPaused(!isPaused);
      }}
    >
      {isPaused ? <PlayIcon /> : <PauseIcon />}
      {isPaused ? ` Resume Log` : ` Pause Log`}
    </Button>
  );

  const leftAlignedToolbarGroup = (
    <ToolbarItem>
      <ControlButton />
    </ToolbarItem>
  );

  const FooterButton = () => {
    const handleClick = () => {
      setIsPaused(false);
    };
    return (
      <>
        {isPaused ? (
          <Button onClick={handleClick} isBlock icon={<OutlinedPlayCircleIcon />}>
            <span>Resume {linesBehind === 0 ? null : `and show ${linesBehind} lines`}</span>
          </Button>
        ) : (
          <Button isBlock variant={'control'} isDisabled>
            {lines.length} lines
          </Button>
        )}
      </>
    );
  };

  return (
    <Card isFullHeight={true}>
      {!isLoading && (
        <LogViewer
          initialIndexWidth={5}
          hasLineNumbers={true}
          height={'100%'}
          data={renderData}
          theme={'dark'}
          scrollToRow={currentItemCount}
          innerRef={logViewerRef}
          onScroll={onScroll}
          toolbar={
            <Toolbar>
              <ToolbarContent>
                <ToolbarGroup alignment={{ default: 'alignLeft' }}>
                  {leftAlignedToolbarGroup}
                </ToolbarGroup>
              </ToolbarContent>
            </Toolbar>
          }
          footer={<FooterButton />}
          overScanCount={10}
        />
      )}
    </Card>
  );
};

export default RulebookLog;
