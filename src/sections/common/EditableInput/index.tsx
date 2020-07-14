import React, { useState } from "react";

interface Props {
  type?: "textarea";
  entity: any;
  field: string;
  onUpdate: (value: any, onSuccess: any, onError: any) => void;
  className: string;
  inline?: boolean;
}

const EditableInput: React.FC<Props> = ({
  entity,
  field,
  onUpdate,
  className,
  inline,
  type,
}) => {
  const [isActiveInput, setIsActiveInput] = useState<boolean>(false);
  const [originalValue, setOriginalValue] = useState<string>(entity[field]);
  const [fieldValue, setFieldValue] = useState<string>(entity[field]);

  return (
    <React.Fragment>
      <div style={{ display: inline ? "inline-flex" : "flex" }}>
        {!isActiveInput ? (
          <div className={className}>{originalValue}</div>
        ) : (
          <div className="form-group">
            {type ? (
              type === "textarea" ? (
                <textarea
                  name={field}
                  cols={30}
                  rows={10}
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                ></textarea>
              ) : null
            ) : (
              <input
                type="text"
                className="form-control"
                style={{
                  minWidth: 250,
                  height: 40,
                  fontSize: 16,
                }}
                id={field}
                name={field}
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
              />
            )}
          </div>
        )}
        <button
          className="btn btn-warning ml-5"
          onClick={() => {
            if (isActiveInput) setFieldValue(originalValue);
            setIsActiveInput(!isActiveInput);
          }}
        >
          {isActiveInput ? "Cancel" : "Edit"}
        </button>
        {isActiveInput && (
          <button
            className="btn btn-primary ml-2"
            onClick={() => {
              if (originalValue !== fieldValue)
                onUpdate(
                  { [field]: fieldValue },
                  () => {
                    setOriginalValue(fieldValue);
                    setIsActiveInput(false);
                  },
                  () => {
                    setOriginalValue(originalValue);
                    setIsActiveInput(false);
                  }
                );
            }}
          >
            Save
          </button>
        )}
      </div>
    </React.Fragment>
  );
};

export default EditableInput;
