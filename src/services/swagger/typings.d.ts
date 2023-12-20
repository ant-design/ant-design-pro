declare namespace API {
  type ApiResponse = {
    code?: number;
    type?: string;
    message?: string;
  };

  type Category = {
    id?: string;
    name?: string;
  };

  type deleteOrderParams = {
    /** ID of the order that needs to be deleted */
    orderId: string;
  };

  type deletePetParams = {
    /** Pet id to delete */
    petId: string;
  };

  type deleteUserParams = {
    /** The name that needs to be deleted */
    username: string;
  };

  type findPetsByStatusParams = {
    /** Status values that need to be considered for filter */
    status: ('available' | 'pending' | 'sold')[];
  };

  type findPetsByTagsParams = {
    /** Tags to filter by */
    tags: string[];
  };

  type getOrderByIdParams = {
    /** ID of pet that needs to be fetched */
    orderId: string;
  };

  type getPetByIdParams = {
    /** ID of pet to return */
    petId: string;
  };

  type getUserByNameParams = {
    /** The name that needs to be fetched. Use user1 for testing.  */
    username: string;
  };

  type loginUserParams = {
    /** The user name for login */
    username: string;
    /** The password for login in clear text */
    password: string;
  };

  type Order = {
    id?: string;
    petId?: string;
    quantity?: number;
    shipDate?: string;
    /** Order Status */
    status?: 'placed' | 'approved' | 'delivered';
    complete?: boolean;
  };

  type Pet = {
    id?: string;
    category?: Category;
    name: string;
    photoUrls: string[];
    tags?: Tag[];
    /** pet status in the store */
    status?: 'available' | 'pending' | 'sold';
  };

  type Tag = {
    id?: string;
    name?: string;
  };

  type updatePetWithFormParams = {
    /** ID of pet that needs to be updated */
    petId: string;
  };

  type updateUserParams = {
    /** name that need to be updated */
    username: string;
  };

  type uploadFileParams = {
    /** ID of pet to update */
    petId: string;
  };

  type User = {
    id?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** User Status */
    userStatus?: number;
  };
}
