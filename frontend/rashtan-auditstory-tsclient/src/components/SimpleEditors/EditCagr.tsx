import React, { useState } from "react";
import { Popover, Drawer, Form, Button } from "antd";
import { InfoCircleOutlined, CalculatorOutlined } from "@ant-design/icons";
import EditNumber from "../SimpleEditors/EditNumber";
import { calculateCagr } from "../../models/Helpers";
import { CagrDto } from "../../models/Calculation";
import { showError } from "../../models/Errors";

interface Props {
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
}

const EditCagr: React.FC<Props> = ({ value, onChange, placeholder }) => {
  const [visible, setVisible] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [values, setValues] = useState<CagrDto | undefined>();

  const onClose = () => setVisible(false);
  const onCalculate = () => {
    if (!values) return;
    setCalculating(true);

    calculateCagr(values)
      .then((v) => {
        onClose();
        onChange && onChange(v);
      })
      .catch(showError)
      .finally(() => setCalculating(false));
  };

  const calculateEnabled =
    !calculating && values && values.start && values.end && values.intervals;

  const cagrCalc = <CalculatorOutlined onClick={() => setVisible(true)} />;

  return (
    <>
      <EditNumber
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        prefix="%"
        suffix={
          <Popover
            title="Compound Annual Growth Rate"
            content={
              <div>
                <a
                  href="https://www.investopedia.com/terms/c/cagr.asp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here
                </a>{" "}
                for explanation.
                <br />
                Or click on {cagrCalc} to calculate
              </div>
            }
          >
            <InfoCircleOutlined />
          </Popover>
        }
        addonAfter={cagrCalc}
      />

      <Drawer
        title="Calculate CAGR"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              onClick={onClose}
              style={{ marginRight: 8 }}
              disabled={calculating}
            >
              Cancel
            </Button>
            <Button
              onClick={onCalculate}
              type="primary"
              disabled={!calculateEnabled}
              loading={calculating}
            >
              Calculate
            </Button>
          </div>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          initialValues={values}
          onValuesChange={(_, values) => setValues(values as CagrDto)}
        >
          <Form.Item
            label="Start value"
            name="start"
            rules={[{ required: true }]}
          >
            <EditNumber placeholder="Start value" />
          </Form.Item>
          <Form.Item label="End value" name="end" rules={[{ required: true }]}>
            <EditNumber placeholder="End value" />
          </Form.Item>
          <Form.Item
            label="No. intervals"
            name="intervals"
            rules={[{ required: true }]}
          >
            <EditNumber placeholder="Number of intervals" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default EditCagr;
