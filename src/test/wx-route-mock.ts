export const callAsSuccess = {
  navigateTo: ({ url, success }) =>
    setTimeout(() => {
      success({ url, whoami: 'navigateTo' });
    }, 500),
  switchTab: ({ url, success }) =>
    setTimeout(() => {
      success({ url, whoami: 'switchTab' });
    }, 500),
  redirectTo: ({ url, success }) =>
    setTimeout(() => {
      success({ url, whoami: 'redirectTo' });
    }, 500),
  navigateBack: ({ delta, success }) =>
    setTimeout(() => {
      success({ delta, whoami: 'navigateBack' });
    }, 500),
};

export const callAsFail = {
  navigateTo: ({ url, fail }) =>
    setTimeout(() => {
      fail({ url, whoami: 'navigateTo' });
    }, 500),
  switchTab: ({ url, fail }) =>
    setTimeout(() => {
      fail({ url, whoami: 'switchTab' });
    }, 500),
  redirectTo: ({ url, fail }) =>
    setTimeout(() => {
      fail({ url, whoami: 'redirectTo' });
    }, 500),
  navigateBack: ({ delta, fail }) =>
    setTimeout(() => {
      fail({ delta, whoami: 'navigateBack' });
    }, 500),
};
