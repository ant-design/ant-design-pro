declare namespace API {
  type ApiResponse = {
    code?: number;
    type?: string;
    message?: string;
  };

  type Category = {
    id?: number;
    name?: string;
  };

  type deleteOrderParams = {
    /** ID of the order that needs to be deleted */
    orderId: number;
  };

  type deletePetParams = {
    api_key?: string;
    /** Pet id to delete */
    petId: number;
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
    orderId: number;
  };

  type getPetByIdParams = {
    /** ID of pet to return */
    petId: number;
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
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: string;
    /** Order Status */
    status?: 'placed' | 'approved' | 'delivered';
    complete?: boolean;
  };

  type Pet = {
    id?: number;
    category?: Category;
    name: string;
    photoUrls: string[];
    tags?: Tag[];
    /** pet status in the store */
    status?: 'available' | 'pending' | 'sold';
  };

  type Tag = {
    id?: number;
    name?: string;
  };

  type updatePetWithFormParams = {
    /** ID of pet that needs to be updated */
    petId: number;
  };

  type updateUserParams = {
    /** name that need to be updated */
    username: string;
  };

  type uploadFileParams = {
    /** ID of pet to update */
    petId: number;
  };

  type User = {
    id?: number;
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
