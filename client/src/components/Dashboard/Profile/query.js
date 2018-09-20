import gql from 'graphql-tag';

export default gql`
  {
    user {
      id
      email
      firstName
      lastName
      gender
      profile {
        userName
        img
        title
        skills {
          lang
          value
        }
        level
        description
        complete
      }
    }
  }
`;

