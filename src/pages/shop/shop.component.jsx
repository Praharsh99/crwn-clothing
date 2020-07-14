import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "./../../components/collections-overview/collections-overview.component";
import CollectionPage from "./../collection/collection.component";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "./../../firebase/firebase.utils";
import { updateCollection } from "./../../redux/shop/shop.actions";
import withSpinner from "./../../components/with-spinner/with-spinner.component";

import "./shop.styles.scss";

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollection } = this.props;
    const collectionRef = firestore.collection("collections");

    // This code is used for the observable and the observer patter
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
    //   async (snapShot) => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
    //     updateCollection(collectionsMap);
    //     this.setState({ loading: false });
    //   }
    // );

    // Promise pattern
    collectionRef.get().then((snapShot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
      updateCollection(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:categoryId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollection: (collectionsMap) =>
    dispatch(updateCollection(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
