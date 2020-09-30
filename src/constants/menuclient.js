const data = (isSuperAdmin) => {
  if (isSuperAdmin) {
    return [
      {
        id: 'users',
        icon: 'iconsminds-user',
        label: 'dashboards.users',
        to: '/client/dashboards/similarity',
        subs: [],
      },
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
        id: 'Employee',
        icon: 'simple-icon-people',
        label: 'dashboards.employee',
        to: '/client/dashboards/similarity',
        subs: [],
      },

      {
        id: 'pages-sentiment',
        icon: 'iconsminds-wheelchair',
        label: 'Sentiment',
        to: '/client/dashboards/sentiment',
        subs: [],
      },
    ];
  }
};
export default data;
