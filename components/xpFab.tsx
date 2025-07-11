import React from "react";
import { FAB, Portal } from "react-native-paper";

type XPFabIcon = {
  closed: string;
  opened: string;
};

type XPFabAction = {
  icon: string;
  label: string;
  onClick: () => void;
};

type TXPFabProps = {
  actions: XPFabAction[];
  icon: XPFabIcon;
};

export const XPFab = ({ actions, icon }: TXPFabProps) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? icon.opened : icon.closed}
        actions={actions.map((action) => ({
          ...action,
          onPress: action.onClick,
        }))}
        onStateChange={onStateChange}
        // style={{ position: "absolute", bottom: 204, right: 16 }}
      />
    </Portal>
  );
};
