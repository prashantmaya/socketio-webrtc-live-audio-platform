import React from "react";
import styles from "./Home.module.css";
import { useHistory } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
import globalStyles from "../../App.module.css";

const Home = () => {
  const history = useHistory();
  function startRegister() {
    history.push("/authenticate");
  }
  return (
    <div className={globalStyles.cardWrapper}>
      <Card title="Welcome to Codershouse!" icon="👋🏻">
        <p className={styles.text}>
          We’re working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks
        </p>
        <div>
          <Button onClick={startRegister} text="Let's Go." />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
          {/* <Link style={signInLinkStyle} to="/login">
            Sign in
          </Link> */}
        </div>
      </Card>
    </div>
  );
};

export default Home;
