function parseCreatedAt(createdAt) {
  const year = +createdAt.substring(0,4);
  const month = +createdAt.substring(5,7);
  const day = +createdAt.substring(8,10);

  return [year, month, day];
}

function getDate() {
  const now = new Date();

  return [now.getFullYear(), now.getMonth() + 1, now.getDate()]
}

export function howLongAgo(createdAt) {
  const created = parseCreatedAt(createdAt);
  const date = getDate();
  const difYear = date[0] - created[0];
  let difMonth = date[1] - created[1];
  const difDay = date[2] - created[2];

  if(difYear > 1 && difMonth >= 0 && difDay >= 0) {
    return `${difYear} years ago`;
  } else if (difYear === 1 && difMonth >= 0 && difDay >= 0) {
    return `${difYear} year ago`;
  } else {
    difMonth = difMonth < 0 ? difMonth + 12 : difMonth;
  }

  if(difMonth > 1 && difDay >= 0) {
    return `${difMonth} months ago`;
  } else if (difMonth === 1 && difDay >= 0) {
    return `${difMonth} month ago`;
  } else if (difDay > 1){
    return `${difDay} days ago`;
  } else if (difDay === 1) {
    return `${difDay} day ago`;
  } else {
    return `less than a day ago`;
  }
}