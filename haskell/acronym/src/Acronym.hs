{-# LANGUAGE OverloadedStrings #-}
module Acronym (abbreviate) where
import qualified Data.Text as T
import Data.Text (Text)

abbreviate :: Text -> String
abbreviate xs = map T.head (map T.toUpper (T.split (==' ') xs))
