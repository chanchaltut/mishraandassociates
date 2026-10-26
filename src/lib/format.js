// A placeholder is any string wrapped in [square brackets], e.g. '[Founder name]'.
export const isPlaceholder = (val) =>
  typeof val === 'string' && val.trim().startsWith('[') && val.trim().endsWith(']');

export const formatDate = (value, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Date(value).toLocaleDateString('en-IN', opts);

export const dayMonth = (value) => {
  const d = new Date(value);
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString('en-IN', { month: 'short' }),
    weekday: d.toLocaleDateString('en-IN', { weekday: 'short' }),
  };
};

export const flagUrl = (code, width = 80) => `https://flagcdn.com/w${width}/${code}.png`;
