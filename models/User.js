const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true, 
  },

  password: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  
  dateofBirth: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  accountNumber: {
    type: String,
    // required: true,
  },

  maritalStatus: {
    type: String,
  },

  accountType: {
    type: String,
    default: "Savings"
  },

  atmCard: {
    cardNumber: {
      type: String,
      required: true
    },

    cardExpDate: {
      type: String,
      required: true
    },

    cardHolderName: {
      type: String,
      required: true
    },
    
    cardCvvNumber: {
      type: String,
      required: true
    },

    cardPinNumber: {
      type: String,
      required: true
    },
  },

  accountBalance: {
    type: Number,
    default: 0.00
  },


status: {
    type: Boolean,
    default: false,
  },


  verify: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  admin:{
     type: mongoose.SchemaTypes.ObjectId,
     ref: "admin"
  },

  otpStore: [{
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],

  Transactions: {
    deposits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'deposit'
    }],
    transfar: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transfar'
    }],
},

}, {timestamps: true});

module.exports = User = mongoose.model('User', UserSchema )

