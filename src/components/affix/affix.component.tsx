import { FC, PropsWithChildren } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";
import { Affix as BackToTop, Button, Text, Transition, rem } from "@mantine/core";

import styles from "./affix.styles.module.scss";

type AffixProps = {
  // ...
};

const AffixComponent: FC<PropsWithChildren<AffixProps>> = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <div className={styles.affix}>
      <BackToTop position={{ bottom: rem(10), right: rem(10) }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size="1rem" />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </BackToTop>
    </div>
  );
};
AffixComponent.displayName = "Affix";

export const Affix = AffixComponent;
