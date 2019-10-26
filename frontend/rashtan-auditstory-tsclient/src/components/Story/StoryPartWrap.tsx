import React from "react";
import { List, Icon } from "antd";

export type WithStoryPartProps<TData> = StoryPartBasicProps<TData>;

export interface StoryPartBasicProps<TData> {
  data: TData;
  remove?: () => void;
  dataChanged: (data: TData) => void;
  title: string;
  id: string;
}

function StoryPartWrap<TData>(
  PartContent:
    | React.ComponentClass<WithStoryPartProps<TData>, {}>
    | React.FunctionComponent<WithStoryPartProps<TData>>
): React.ComponentClass<StoryPartBasicProps<TData>> {
  return class WithStoryPart extends React.Component<
    StoryPartBasicProps<TData>
  > {
    displayName = `WithStoryPart(${PartContent.displayName})`;

    render() {
      const { remove, id, title } = this.props;
      return (
        <List.Item
          key={id}
          actions={remove && [<Icon type="delete" onClick={remove} />]}
        >
          <List.Item.Meta title={title} />
          <PartContent {...this.props} />
        </List.Item>
      );
    }
  };
}

export default StoryPartWrap;
