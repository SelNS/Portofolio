// Import modul-modul yang diperlukan dari Azle
import { Principal, text, record, Vec, query, update, Canister, Null, async } from 'azle';

// Definisikan tipe data Experience
type Experience = {
  id: text;
  job_title: text;
  company: text;
  city: text;
  start_date: text;
  end_date: text;
  description: text;
};

// Definisikan tipe data PersonalDetails
type PersonalDetails = {
  cover: text;
  avatar: text;
  name: text;
  position: text;
  description: text;
};

// Definisikan tipe data Portfolio
type Portfolio = {
  id: text;
  portfolio_name: text;
  personal_details: PersonalDetails;
  experience: Vec<Experience>;
};

// Inisialisasi variabel portfolios
let portfolios: Portfolio[] = [];

// Implementasi service Canister
service : {
  query getPortfolioById(queryById: text) : async -> (Portfolio | Null) {
    return portfolios.find(portfolio => portfolio.id === queryById) ?? null;
  };

  query getAllPortfolios() : async -> Vec<Portfolio> {
    return portfolios;
  };

  update addPortfolio(addPortfolio: record {
    id: text;
    portfolio_name: text;
    personal_details: PersonalDetails;
    experience: Vec<Experience>;
  }) : async -> Void {
    portfolios.push(addPortfolio);
  };

  update updatePortfolio(updatePortfolio: record {
    id: text;
    portfolio_name?: text;
    personal_details?: PersonalDetails;
    experience?: Vec<Experience>;
  }) : async -> Void {
    const index = portfolios.findIndex(portfolio => portfolio.id === updatePortfolio.id);
    if (index !== -1) {
      portfolios[index] = { ...portfolios[index], ...updatePortfolio };
    }
  };

  update deletePortfolio(deleteById: text) : async -> Void {
    portfolios = portfolios.filter(portfolio => portfolio.id !== deleteById);
  };
};
