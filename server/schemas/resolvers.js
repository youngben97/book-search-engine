const { User } = require ('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('saveBooks');
          }
          throw AuthenticationError;
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password}) => {
            console.log('Executing addUser resolver');
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError
            }
      
            const token = signToken(user);
            return { token, user };
          },
        saveBook: async (parent, { bookInput }, context) => {
          try {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                {$addToSet: { savedBooks: bookInput } },
                {
                  new: true,
                  runValidators: true
                }
              );

              if (!updatedUser) {
                // Handle the case where the user is not found
                throw new Error('User not found');
              }

              return updatedUser.savedBooks;
            }
          } catch (error) {
            console.error('Error saving book:', error);
            throw new Error('Failed to save book');
          }
            },
        removeBook: async (parent, { bookId }, context) => {
              if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $pull: { savedBooks: { bookId: bookId } } },
                  { new: true }
                );
        
                return updatedUser;
              }
              throw new AuthenticationError('User not authenticated');
            },
        }
};



module.exports = resolvers;