import * as React from "react";
// import Moment from 'react-moment';
import { get } from "idb-keyval";
import Balance from "../components/Balance";
import LoadingSpinner from "../components/LoadingSpinner";
import dc from "../assets/images/dc.svg";

const Wallet = () => {
  const [actor, setActor] = React.useState(null);
  const [transactions, setTransactions] = React.useState({});
  const [currentGoal, setCurrentGoal] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [child, setChild] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true)
    get("selectedChild").then(async (data) => {
      const [balance, name] = await Promise.all([get(`balance-${data}`), get(`selectedChildName`)])
      setChild({
        id: data,
        balance: parseInt(balance),
        name
      });
    })
  }, [])

  function getTransactions() {
    if (child) {
    console.log("getTransactions called for child id: "+child.id);
    setIsLoading(true);
    actor?.getTransactions(child.id).then((returnedTransactions) => {
      if ("ok" in returnedTransactions) {
        const transactions = Object.values(returnedTransactions);
        setTransactions(transactions);
        setIsLoading(false);
      } else {
        console.error(returnedTransactions.err);
      }
    });
    return false;
  }
}

  const initActor = () => {
    import("../../declarations/backend").then((module) => {
      const actor = module.createActor(module.canisterId, {});
      setActor(actor);
    });
  };

  React.useEffect(() => {
    initActor();
  }, []);

  React.useEffect(() => {
    if (child) getTransactions(child);
  }, [actor, child]);

  if(isLoading) {
    return  <LoadingSpinner />
  }

  return (
    <>
      <Balance childName={child.name} childBalance={child.balance} />

      <div className="light-panel">
        <h2 className="title-button dark"><span>Transactions</span></h2>
        {isLoading ? <LoadingSpinner /> : null}
        {transactions.length > 0 &&
              transactions[0].reverse().map(transaction => (
            <div
              className="list-item"
              role="button"
              key={parseInt(transaction.id)}
            >
              {/* <div><Moment format="DD/MM/YY" unix>{transaction.completedDate}</Moment> {transaction.name}</div> */}
              <div>
                <img src={dc} className="dc-img-small" alt="DooCoins symbol" />
                {parseInt(transaction.value)}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Wallet;