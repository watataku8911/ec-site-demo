import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsername } from "../../src/reducks/users/selectors";
import { push } from "connected-react-router";
import { SecondaryButton, TextDetail } from "../components/UIKit/index";

const Profile = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const userName = getUsername(selector);

  const transition = useCallback(
    (path) => {
      dispatch(push(path));
    },
    [dispatch]
  );

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">マイページ</h2>
      <TextDetail label="ユーザー名" value={userName} />
      <div className="module-spacer--small" />
      <div className="center">
        <SecondaryButton
          label={"カード情報の編集"}
          onClick={() => transition("/user/payment/edit")}
        />
        <SecondaryButton
          label={"注文履歴の確認"}
          onClick={() => transition("/order/history")}
        />
      </div>
    </section>
  );
};
export default Profile;
