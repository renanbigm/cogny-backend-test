DROP VIEW if exists ${schema:raw}.filtered_years CASCADE;

-- CREATE OR REPLACE VIEW ${schema:raw}.filtered_years AS SELECT * FROM api_data.doc_record
--   WHERE Year IN (2018, 2019, 2020);
