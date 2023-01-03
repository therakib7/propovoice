import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pro from "block/pro-alert";
import ProLabel from "block/pro-alert/label";
import { toast } from "react-toastify";
import AppContext from "context/app-context";
import Spinner from "block/preloader/spinner";

//form
import GOAuth2 from "./services/goauth2";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      formModal: false,
      currentTab: this.props.tab,
      list: this.services,
      singleList: [],
    };
  }

  services = [
    {
      name: "Google Apps",
      slug: "oauth2",
      img: "https://cdn.cdnlogo.com/logos/o/50/oauth.svg",
      active: false,
      pro: true,
    },
  ];

  getSingleList = (slug) => {
    this.setState({ loading: true });
    this.props.getAll("intg-smtp/" + slug).then((resp) => {
      if (resp.data.success) {
        this.setState({ singleList: resp.data.data, loading: false });
      }
    });
  };

  addCurrentTab = (item) => {
    const slug = item.slug;

    this.setState({ currentTab: slug });
    this.props.onChange("google-api", slug, false);
  };

  render() {
    const { loading, currentTab, list, singleList } = this.state;
    const i18n = ndpv.i18n;
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {!currentTab && (
              <div className="pv-intg-list">
                {list.map((item, i) => (
                  <div
                    key={i}
                    className="pv-intg-item"
                    onClick={() => this.addCurrentTab(item)}
                  >
                    <img
                      src={item.img}
                      style={{ maxWidth: "150px", maxHeight: "50px" }}
                    />
                    <h4>
                      {item.name} {item.pro && wage.length > 0 && <ProLabel />}
                    </h4>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {currentTab == "oauth2" && <GOAuth2 {...this.props} />}
        
      </>
    );
  }
}
