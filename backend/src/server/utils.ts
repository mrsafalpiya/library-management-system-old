// getSortQuery validates a input given in query by comparing it with the valid
// inputs.
// The returned value is to be used in SQL query as ORDER BY string1 string2
// where string1 and string2 are the returned strings in array.
export function getSortQuery(
  input: string,
  validInputs: string[]
): [string, string] {
  const splits = input.split("-");
  if (splits.length != 2) {
    throw Error("invalid sort query -- must be of [sort_param]-[asc|desc]");
  }

  if (!validInputs.includes(splits[0])) {
    throw Error("invalid sort query -- valid sort param are: " + validInputs);
  }

  if (splits[1] != "asc" && splits[1] != "desc") {
    throw Error(
      "invalid sort query -- valid sorting are 'asc' and 'desc' only"
    );
  }

  return [splits[0], splits[1]];
}
