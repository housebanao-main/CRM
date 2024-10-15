import SideNavigation from "../components/SideNavigation/SideNavigation";
import Header from "../components/Header/Header";
import BoqTable from "../components/Boq/BoqTable";

import styles from "./Pages.module.css";

const Boq = () => {

  return (
    <div className={styles.container}>
      <Header />
      <SideNavigation />
      <BoqTable />
    </div>
  );
};

export default Boq;
