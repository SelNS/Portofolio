import { text,Null, $query, $update, Record,
    Vec, match, Result, nat64, ic, Opt } from 'azle'; import { v4 as uuidv4 } from 'uuid'; 
import { v4 as uuidv4 } from 'uuid';
// import { getPortfolioById, getAllPortfolio, addPortfolio, 
//     updatePortfolio, deletePortfolio } from 'src/index.ts';
// Define types
type Experience = Record<{
    id: string;
    job_title: string;
    company: string;
    city: text;
    start_date: nat64;
    end_date: Opt<nat64>;
    description: text;
}>;

type PersonalDetails = Record<{
    cover: text;
    avatar: text;
    name: string;
    position: string;
    description: text;
}>;

export type Portfolio = Record<{
    id: string;
    portfolio_name: string;
    personal_details: PersonalDetails;
    experience: Vec<Experience>;
}>;

// Initialize portfolios array
let portfolios: Portfolio[] = [];

// Implement Canister in function
$query;
function getPortfolioById(id: string): Result<Portfolio, string> {
    return match(portofolios.get(id),{
        some: (portfolio) => Result.Ok<Portfolio, string>(portfolio),
        none: () => Result.Err<Portfolio, string>(`a message with id=${id} not found`)
    });
}

$query;
function getAllPortfolio(): Result<Vec<Portfolio>, string> {
    return Result.Ok(portfolios.values());
    }

$update;
function addPortfolio(expert: Experience): Result<Portfolio, string> {
    let portfolios : Portfolio = {id: uuid4(), start_date: ic.time(), end_date: Opt.None, ...expert};
    portfolios.insert(portfolio.id, portfolio); 
    return Result.Ok(portfolio);
}

$update;
function updatePortfolio(id: string, expert: Experience): Result<Portfolio, string> {
    return match(portfolios.get(id), {
        Some: (portfolio) => {
            const updatedPortfolio: Portfolio = {...portfolio, ...expert, end_date: Opt.Some(ic.time())};
            portfolios.insert(portfolio.id, updatedPortfolio);
            return Result.Ok<Portfolio, string>(updatedPortfolio);
        },
        None: () => Result.Err<Portfolio, string>(`couldn't update a portfolio with id=${id}. portfolio not found`)
    });
}

$update;
function deletePortfolio(id: string): Result<Portfolio, string> {
    return match(portfolios.remove(id), {
        Some: (deletedPortfolio) => Result.Ok<Portfolio, string>(deletedPortfolio),
        None: () => Result.Err<Portfolio, string>(`couldn't delete a portfolio with id=${id}. portfolio not found.`)
    });
}

// a workaround to make uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);
        for (let i = 0; i < array.length; i++){
            array[i] = Math.floor(Math.random() * 256);
        }
        return array;
    }
};
