function parseCreatedAt(createdAt) {
  const year = +createdAt.substring(0, 4);
  const month = +createdAt.substring(5, 7);
  const day = +createdAt.substring(8, 10);
  const hour = (+createdAt.substring(11, 13) + 17)%24;
  const minute = +createdAt.substring(14, 16);

  return [year, month, day, hour, minute];
}

function getDate() {
  const now = new Date();

  return [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()]
}

export function howLongAgo(createdAt) {
  const created = parseCreatedAt(createdAt);
  const date = getDate();
  let difMinute = date[4] - created[4];
  let difHour = date[3] - created[3];
  difHour -= difMinute < 0 ? 1 : 0;
  let difDay = date[2] - created[2];
  difDay -= difHour < 0 ? 1 : 0;
  let difMonth = date[1] - created[1];
  difMonth -= difDay < 0 ? 1 : 0;
  let difYear = date[0] - created[0];
  difYear -= difMonth < 0 ? 1 : 0;

  if (difYear > 1) {
    return `${difYear} years ago`;
  } else if (difYear === 1) {
    return `${difYear} year ago`;
  } else if (difMonth < -1) {
    difMonth += 12;
  }
  
  if (difMonth > 1) {
    return `${difMonth} months ago`;
  } else if (difMonth === 1) {
    return `${difMonth} month ago`;
  } else if (difDay < -1) {
    difDay += 30;
  }

  if (difDay > 1) {
    return `${difDay} days ago`;
  } else if (difDay === 1) {
    return `${difDay} day ago`;
  } else if (difHour < -1) {
    difHour += 24;
  }

  if (difHour > 1) {
    return `${difHour} hours ago`;
  } else if (difHour === 1) {
    return `${difHour} hour ago`;
  } else if (difMinute < -1) {
    difMinute += 60;
  }
  
  if (difMinute > 1) {
    return `${difMinute} minutes ago`;
  } else if (difMinute === 1) {
    return `${difMinute} minute ago`;
  } else {
    return `less than a minute ago`;
  }
}