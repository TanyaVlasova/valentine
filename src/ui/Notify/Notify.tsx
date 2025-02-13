import cn from "classnames";
import styles from "./Notify.module.css";
import type { FC, HTMLAttributes, PropsWithChildren } from "react";

type NotifyProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

const Notify: FC<NotifyProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <div className={cn(styles.notify, className)} {...restProps}>
      {children}
    </div>
  );
};

export default Notify;
