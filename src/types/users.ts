type User = {
  uid: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email: string | null;
  avatar?: string;
  username?: string;
  gender?: string;
  address?: Address;
};

type Address = {
    fullAddress: string;
}

export { User , Address};
