CREATE TABLE IF NOT EXISTS tasas (
  fecha date PRIMARY KEY,
  tasa numeric(10, 4) NOT NULL CHECK (tasa > 0)
);
