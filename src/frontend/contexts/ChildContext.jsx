import React, { createContext } from "react";
import { useAuth } from "../use-auth-client";
import { del, get, set } from "idb-keyval";
import { noGoalEntity } from "../utils/constants";

export const ChildContext = createContext();

export default function ChildProvider({ children }) {
  const { actor } = useAuth();
  const [child, setChild] = React.useState(null);
  const [goal, setGoal] = React.useState(null);

  const getSelectedChild = async () => {
    let response;
    await get("selectedChild").then(async (data) => {
      const [balance, name] = await Promise.all([
        get(`balance-${data}`),
        get(`selectedChildName`),
      ]);
      if (data) {
        const selectedChild = {
          id: data,
          balance: parseInt(balance),
          name,
        };
        setChild(selectedChild);
      }
      response = data;
    });

    return response;
  };

  const handleSetGoalLocally = async () => {
    let response;
    await get("childGoal").then(async (data) => {
      response = data;
      if (data) {
        setGoal({
          name: data.name,
          value: parseInt(data.value),
          hasGoal: data.hasGoal,
          ...data,
        });
      }
    });
    return response;
  };

  async function getBalance(childID) {
    return new Promise((resolve, reject) => {
      get("balance-" + childID)
        .then((val) => {
          actor?.getBalance(childID).then((returnedBalance) => {
            set("balance-" + childID, parseInt(returnedBalance));
            resolve(returnedBalance);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  const handleUnsetGoal = () => {
    actor?.currentGoal(child.id, 0).then(async (returnedCurrentGoal) => {});
    setGoal(noGoalEntity);
    set("childGoal", noGoalEntity);
  };

  const values = React.useCallback(() => {
    return {
      child,
      setChild,
      getSelectedChild,
      handleSetGoalLocally,
      goal,
      setGoal,
      getBalance,
      handleUnsetGoal
    };
  }, [
    child,
    setChild,
    getSelectedChild,
    handleSetGoalLocally,
    goal,
    setGoal,
    getBalance,
    handleUnsetGoal
  ]);

  return (
    <>
      <ChildContext.Provider value={values()}>{children}</ChildContext.Provider>
    </>
  );
}
