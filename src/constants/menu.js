const data = isSuperAdmin => {
  if (isSuperAdmin) {
    return [
      {
        id: "users",
        icon: "iconsminds-user",
        label: "dashboards.users",
        to: "/app/dashboards/users",
        subs: []
      },
      {
        id: "packages",
        icon: "simple-icon-social-dropbox",
        label: "dashboards.pack",
        to: "/app/dashboards/packages",
        subs: []
      },
      {
        id: "Employee",
        icon: "simple-icon-people",
        label: "dashboards.employee",
        to: "/app/dashboards/employee",
        subs: []
      },
      {
        id: "pages-product",
        icon: "iconsminds-wheelchair",
        label: "dashboards.incapacity",
        to: "/app/dashboards/incapacity",
        subs: []
      }
    ];
  } else {
    return [
      // {
      //   id: "packages",
      //   icon: "simple-icon-social-dropbox",
      //   label: "dashboards.pack",
      //   to: "/app/dashboards/packages",
      //   subs: []
      // },
      {
        id: "Employee",
        icon: "simple-icon-people",
        label: "dashboards.employee",
        to: "/app/dashboards/employee",
        subs: []
      },
      {
        id: "pages-product",
        icon: "iconsminds-wheelchair",
        label: "dashboards.incapacity",
        to: "/app/dashboards/incapacity",
        subs: []
      }
    ];
  }
};
export default data;
