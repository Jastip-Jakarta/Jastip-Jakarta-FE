import { INFO_STATUS } from "@/utils/constants/info-status";
import { Button } from "./ui/button";
import { cn } from "@/utils/helpers";
interface InfoStatusProps {
  statusOrder: string | undefined;
  action?: () => void;
  className?: string;
  hiddenInfo?: boolean;
}
const InfoStatus = ({ statusOrder, action, className, hiddenInfo }: InfoStatusProps) => {
  const buttonInfo = INFO_STATUS.find(
    (info) => info.status.toLowerCase() == statusOrder?.toLocaleLowerCase()
  );
  const buttonVariant = buttonInfo?.buttonType ?? (null as any);

  return (
    <>
      <h3 className="font-bold text-sm uppercase" hidden={hiddenInfo}>
        Status
      </h3>
      <Button
        size={"xs"}
        disabled
        variant={buttonVariant}
        className={cn(
          "uppercase !text-[10px] !font-bold max-w-full rounded-full disabled:opacity-100 tracking-wider whitespace-normal leading-snug",
          className
        )}
        onClick={action}
      >
        {buttonInfo?.status}
      </Button>
      <p className="text-xs italic" hidden={hiddenInfo}>
        {buttonInfo?.message}
      </p>
    </>
  );
};

export default InfoStatus;
