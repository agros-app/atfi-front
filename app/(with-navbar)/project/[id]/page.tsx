import FarmImage from "./components/farmImage/farmImage";
import About from "./components/about/about";
import Map from "./components/map/map";
import FinancialInfo from "./components/financialInfo/financialInfo";
import Producer from "./components/producer/producer";
import styles from "./project.module.scss";
import { getProjectById } from "@/api";
import { differenceInCalendarDays, startOfToday } from "date-fns";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { name, endDate, startDate, amountCollected, amountNeed, minAmount } =
    await getProjectById(parseInt(id));
  const days = differenceInCalendarDays(new Date(endDate), startOfToday());
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.name}>{name}</span>
        <span className={styles.city}>, Argentina</span>
      </h1>
      <div className={styles.content}>
        <div className={styles.leftHandSide}>
          <div className={styles.component}>
            <FarmImage duration={days} />
          </div>
          <div className={styles.component}>
            <About />
          </div>
          <div className={styles.component}>
            <Map />
          </div>
        </div>
        <div className={styles.rightHandSide}>
          <div className={styles.component}>
            <FinancialInfo
              projectId={parseInt(id)}
              currentAmmount={amountCollected}
              goalAmmount={amountNeed}
              minAmmount={minAmount}
            />
          </div>
          <div className={styles.component}>
            <Producer />
          </div>
        </div>
      </div>
      <div>
        *Esto es solo un estimado hacho por ATFI que blah balh lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim
      </div>
    </div>
  );
}
