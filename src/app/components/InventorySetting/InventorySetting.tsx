import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Modal,
  ModalVariant,
  Title,
} from '@patternfly/react-core';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import * as monacoEditor from 'monaco-editor';
import { CheckCircleIcon } from '@patternfly/react-icons';

export interface InventorySettingProps {
  value: string;
  onSave: (value: string) => void;
  status: 'ready' | 'saving';
}

const InventorySetting: FunctionComponent<InventorySettingProps> = (props) => {
  const { value, onSave, status } = props;
  const [code, setCode] = useState(value);
  const [errors, setErrors] = useState<number>(0);
  const [showValidationDialog, setShowValidationDialog] = useState(false);

  const onEditorDidMount = (editor, monaco) => {
    editor.layout();
    editor.focus();
    monaco.editor.getModels()[0].updateOptions({ tabSize: 2 });
  };

  const handleSave = () => {
    if (errors > 0) {
      setShowValidationDialog(true);
    } else {
      onSave(code);
    }
  };

  const isSaving = status === 'saving';

  useEffect(() => {
    const onMarkersChange = monacoEditor.editor.onDidChangeMarkers(([resource]) => {
      const markers: monacoEditor.editor.IMarker[] = monacoEditor.editor.getModelMarkers({
        resource,
      });
      const errors = markers.filter(
        (marker) => marker.severity === monacoEditor.MarkerSeverity.Error
      );
      setErrors(errors.length);
    });
    return () => {
      onMarkersChange.dispose();
    };
  }, []);

  return (
    <>
      <Card>
        <CardTitle>
          <Title headingLevel="h2" size="xl">
            Inventory configuration
          </Title>
        </CardTitle>
        <CardBody>
          <CodeEditor
            isLineNumbersVisible={true}
            isReadOnly={false}
            isMinimapVisible={true}
            isLanguageLabelVisible={true}
            isUploadEnabled={true}
            isCopyEnabled={true}
            code={code}
            onChange={setCode}
            onCodeChange={setCode}
            language={Language.yaml}
            onEditorDidMount={onEditorDidMount}
            height="400px"
          />
        </CardBody>
        <CardFooter>
          <SaveButton onClick={handleSave} isSaving={isSaving} />
        </CardFooter>
      </Card>
      {showValidationDialog && <ValidationModal onClose={() => setShowValidationDialog(false)} />}
    </>
  );
};

export default InventorySetting;

const ValidationModal = ({ onClose }: { onClose: () => void }) => (
  <Modal
    variant={ModalVariant.small}
    title="Validation error"
    titleIconVariant="danger"
    isOpen={true}
    aria-describedby="modal-title-icon-description"
    onClose={onClose}
    actions={[
      <Button key="confirm" variant="primary" onClick={onClose}>
        Close
      </Button>,
    ]}
  >
    <span id="modal-title-icon-description">
      There are errors in the provided configuration YAML. Please fix them before saving the
      configuration.
    </span>
  </Modal>
);

const SaveButton = ({ onClick, isSaving }: { onClick: () => void; isSaving: boolean }) => {
  enum ButtonStatus {
    Idle = 'Save',
    Saving = 'Saving',
    Saved = 'Saved!',
  }

  const [status, setStatus] = useState(ButtonStatus.Idle);

  useEffect(() => {
    if (isSaving) {
      setStatus(ButtonStatus.Saving);
    } else {
      if (status === ButtonStatus.Saving) {
        setStatus(ButtonStatus.Saved);
        setTimeout(() => {
          setStatus(ButtonStatus.Idle);
        }, 3000);
      }
    }
  }, [status, isSaving, ButtonStatus]);

  return (
    <Button
      variant={'primary'}
      onClick={onClick}
      isDisabled={isSaving}
      isLoading={isSaving}
      icon={status === ButtonStatus.Saved ? <CheckCircleIcon /> : null}
      iconPosition={'left'}
    >
      {status}
    </Button>
  );
};
