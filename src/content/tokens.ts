import type { Token } from "@/types";

const P = ["goplus-token", "defi-scanner", "chainaware", "honeypotis", "peg-monitor"] as const;

function token(
  id: string, name: string, symbol: string,
  type: Token["type"], mcap: number, address: string,
  isPegMonitored = false,
): Token {
  return {
    id, name, symbol, type, mcap, address,
    providerSlugs: {
      [P[0]]: address,
      [P[1]]: id,
      [P[2]]: address,
      [P[3]]: address,
      [P[4]]: isPegMonitored ? id : null,
    },
  };
}

/**
 * Top 20 ERC-20 tokens + top 20 stablecoins on Ethereum by market cap.
 * Tokens from DeFiLlama /protocols API, stablecoins from /stablecoins API.
 * Last fetched: 2026-06-10
 */
export const TOKENS: Token[] = [
  // ── Exchange ──
  token("wbt",   "WhiteBIT",    "WBT",    "exchange", 6_012_059_263, "0x925206b8a707096ed26ae47c84747fe0bb734f59"),
  token("cro",   "Cronos",      "CRO",    "exchange", 2_679_680_804, "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b"),
  token("nexo",  "Nexo",        "NEXO",   "exchange",   789_783_011, "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206"),
  token("gt",    "Gate",        "GT",     "exchange",   672_344_611, "0xe66747a101bff2dba3697199dcce5b743b454759"),

  // ── RWA ──
  token("xaut",  "Tether Gold", "XAUt",   "rwa",      2_520_105_618, "0x68749665ff8d2d112fa859aa293f07a622782f38"),

  // ── DeFi ──
  token("wlfi",   "World Liberty Financial", "WLFI",   "defi", 1_907_994_384, "0xda5e1988097297dcdc1f90d4dfe7909e847cbef6"),
  token("aave",   "Aave",                    "AAVE",   "defi",   951_985_904, "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"),
  token("ohm",    "Olympus",                 "OHM",    "defi",   248_549_639, "0x64aa3364F17a4D01c6f1751Fd97C2BD3D7e7f1D5"),
  token("ldo",    "Lido",                    "LDO",    "defi",   218_909_813, "0x5a98fcbea516cf06857215779fd812ca3bef1b32"),
  token("ff",     "Falcon Finance",          "FF",     "defi",   216_472_611, "0xfa1c09fc8b491b6a4d3ff53a10cad29381b3f949"),
  token("pendle", "Pendle",                  "PENDLE", "defi",   206_655_686, "0x808507121b80c02388fad14726482e061b8da827"),

  // ── Infrastructure ──
  token("mnt",  "Mantle",    "MNT",   "infrastructure", 1_774_407_017, "0x3c3a81e81dc49a522a592e7622a7e711c06bf354"),
  token("wld",  "Worldcoin", "WLD",   "infrastructure", 1_503_857_764, "0x163f8c2467924be0ae7b5347228cabf260318753"),
  token("pol",  "Polygon",   "POL",   "infrastructure",   776_581_444, "0x455e53cbb86018ac2b8092fdcd39d8444affc3f6"),
  token("h",    "Humanity",  "H",     "infrastructure",   318_486_137, "0xcf5104d094e3864cfcbda43b82e1cefd26a016eb"),
  token("gno",  "Gnosis",    "GNO",   "infrastructure",   249_736_836, "0x6810e776880c02933d47db1b9fc05908e5386b96"),
  token("strk", "Starknet",  "STRK",  "infrastructure",   218_742_716, "0xCa14007Eff0dB1f8135f4C25B34De49AB0d42766"),
  token("grt",  "The Graph", "GRT",   "infrastructure",   206_141_199, "0xc944e90c64b2c07662a292be6244bdf05cda44a7"),

  // ── Meme ──
  token("floki", "Floki", "FLOKI", "meme", 235_540_155, "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e"),

  // ── Stablecoins (from DeFiLlama /stablecoins API) ──
  token("usdt",  "Tether",              "USDT",  "stablecoin", 186_750_053_320, "0xdAC17F958D2ee523a2206206994597C13D831ec7", true),
  token("usdc",  "USD Coin",            "USDC",  "stablecoin",  75_028_616_666, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", true),
  token("usds",  "Sky Dollar",          "USDS",  "stablecoin",   8_444_945_099, "0xdC035D45d973E3EC169d2276DDab16f1e407384F", true),
  token("usd1",  "World Liberty USD",   "USD1",  "stablecoin",   4_481_356_373, "0x8d0d000ee44948fc98c9b98a4fa4921476f08b0d", true),
  token("usde",  "Ethena USDe",         "USDe",  "stablecoin",   4_479_447_417, "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3", true),
  token("dai",   "Dai",                 "DAI",   "stablecoin",   4_430_766_716, "0x6B175474E89094C44Da98b954EedeAC495271d0F", true),
  token("usyc",  "Hashnote USYC",       "USYC",  "stablecoin",   3_011_246_165, "0x136471a34f6ef19fE571EFFC1CA711fdb8E49f2b", true),
  token("buidl", "BlackRock BUIDL",     "BUIDL", "stablecoin",   2_987_922_165, "0x7712c34205737192402172409a8f7ccef8aa2aec", true),
  token("pyusd", "PayPal USD",          "PYUSD", "stablecoin",   2_839_034_661, "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8", true),
  token("usdg",  "Global Dollar",       "USDG",  "stablecoin",   2_588_181_711, "0xe343167631d89b6ffc58b88d6b7fb0228795491d", true),
  token("usdy",  "Ondo USDY",           "USDY",  "stablecoin",   2_143_774_048, "0x96f6ef951840721adbf46ac996b59e0235cb985c", true),
  token("rlusd", "Ripple USD",          "RLUSD", "stablecoin",   1_651_129_800, "0x8292bb45bf1ee4d140127049757c2e0ff06317ed", true),
  token("usdd",  "USDD",                "USDD",  "stablecoin",   1_339_849_627, "0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6", true),
  token("usdf",  "Falcon USD",          "USDf",  "stablecoin",   1_295_992_851, "0xFa2B947eEc368f42195f24F36d2aF29f7c24CeC2", true),
  token("usdtb", "Ethena USDtb",        "USDTB", "stablecoin",   1_040_626_896, "0xC139190F447e929f090Edeb554D95AbB8b18aC1C", true),
  token("u",     "United Stables",      "U",     "stablecoin",     999_859_807, "0xce24439f2d9c6a2289f741120fe202248b666666", true),
  token("gho",   "GHO",                 "GHO",   "stablecoin",     598_392_352, "0x40D16FC0246aD3160Ccc09B8D0D3A2cD28aE6C2f", true),
  token("usd0",  "Usual USD",           "USD0",  "stablecoin",     552_965_121, "0x73a15fed60bf67631dc6cd7bc5b6e8da8190acf5", true),
  token("tusd",  "TrueUSD",             "TUSD",  "stablecoin",     483_768_304, "0x0000000000085d4780B73119b644AE5ecd22b376", true),
  token("fdusd", "First Digital USD",   "FDUSD", "stablecoin",     338_748_311, "0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409", true),
];
