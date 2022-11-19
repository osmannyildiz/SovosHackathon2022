package chaincode

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

//json represents
type Asset struct {
	ProfileID 					  int    `json:"ProfileID"`
	DocumentCurrencyCode          string `json:"DocumentCurrencyCode"`
	ID             				  string `json:"ID"` //fatura numarası olacak
	Owner          				  string `json:"Owner"`
	Size           				  int    `json:"Size"`
	IssueDate 				 	  string `json:"IssueDate"`
	Note             			  string `json:"Note"`
	Name 						  string `json:"Name"`
}

// InitLedger adds a base set of assets to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	assets := []Asset{
		{ID: "asset1", DocumentCurrencyCode: "TRY", Size: 5, Owner: "Simsek Mcqueen", ProfileID: TEMELFATURA, IssueDate: "2013-10-10",Name: "TÜRKİYE",},
		{ID: "asset2", DocumentCurrencyCode: "TRY", Size: 5, Owner: "Kaiser II. Wilhelm", ProfileID: TEMELFATURA, IssueDate: "2013-10-10",Name: "ALMANYA",},
		{ID: "asset3", DocumentCurrencyCode: "TRY", Size: 10, Owner: "Vitalik Buterin", ProfileID: TEMELFATURA, IssueDate: "2013-10-10",Name: "TÜRKİYE",},
		{ID: "asset4", DocumentCurrencyCode: "TRY", Size: 10, Owner: "Burak", ProfileID: TEMELFATURA, IssueDate: "2013-10-10",Name: "TÜRKİYE",},
		{ID: "asset5", DocumentCurrencyCode: "TRY", Size: 15, Owner: "Baturalp", ProfileID: TEMELFATURA, IssueDate: "2013-10-10",Name: "TÜRKİYE",},
		{ID: "asset6", DocumentCurrencyCode: "TRY", Size: 15, Owner: "Osman Nuri", ProfileID: TEMELFATURA, IssueDate: "2013-10-10",Name: "TÜRKİYE",},
		{ID: "asset7", DocumentCurrencyCode: "TRY", Size: 5, Owner: "Sovos Mentorlar", ProfileID: TEMELFATURA, IssueDate: "2013-10-10",Name: "TÜRKİYE",},
		{ID: "asset8", DocumentCurrencyCode: "TRY", Size: 5, Owner: "Gülsüm Abla", ProfileID: TEMELFATURA, IssueDate: "2013-10-10",Name: "TÜRKİYE",},
		
		fmt.Println(string(ID), string(DocumentCurrencyCode), string(Owner), string(ProfileID), string(IssueDate), string(Name)) error {

			return nil

		}

	}

	for _, asset := range assets {
		assetJSON, err := json.Marshal(asset)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(asset.ID, assetJSON)
		if err != nil {
			return fmt.Errorf("failed to put to world state. %v", err)
		}
	}

	return nil
}

// CreateAsset issues a new asset to the world state with given details.
func (s *SmartContract) CreateAsset(ctx contractapi.TransactionContextInterface, id string, DocumentCurrencyCode string, size int, owner string, ProfileID int) error {
	exists, err := s.AssetExists(ctx, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", id)
	}

	asset := Asset{
		ID:             			   id,
		DocumentCurrencyCode:          documentCurrencyCode,
		Size:           		       size,
		Owner:          			   owner,
		ProfileID: 				       profileID,
		IssueDate:  				   issueDate,
		Name: 						   name,
		
	}
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, assetJSON)
}

// ReadAsset returns the asset stored in the world state with given id.
func (s *SmartContract) ReadAsset(ctx contractapi.TransactionContextInterface, id string) (*Asset, error) {
	assetJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if assetJSON == nil {
		return nil, fmt.Errorf("the asset %s does not exist", id)
	}

	var asset Asset
	err = json.Unmarshal(assetJSON, &asset)
	if err != nil {
		return nil, err
	}

	return &asset, nil
}

// UpdateAsset updates an existing asset in the world state with provided parameters.
func (s *SmartContract) UpdateAsset(ctx contractapi.TransactionContextInterface, id string, DocumentCurrencyCode string, size int, owner string, ProfileID int) error {
	exists, err := s.AssetExists(ctx, id)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the asset %s does not exist", id)
	}

	// overwriting original asset with new asset
	asset := Asset{
		ID:             id,
		DocumentCurrencyCode:          DocumentCurrencyCode,
		Size:           size,
		Owner:          owner,
		ProfileID: ProfileID,
	}
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, assetJSON)
}

// DeleteAsset deletes an given asset from the world state.
func (s *SmartContract) DeleteAsset(ctx contractapi.TransactionContextInterface, id string) error {
	exists, err := s.AssetExists(ctx, id)
	if err != nil {
		return err
	}
	if !exists {
		return fmt.Errorf("the asset %s does not exist", id)
	}

	return ctx.GetStub().DelState(id)
}

// AssetExists returns true when asset with given ID exists in world state
func (s *SmartContract) AssetExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	assetJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return assetJSON != nil, nil
}

// TransferAsset updates the owner field of asset with given id in world state, and returns the old owner.
func (s *SmartContract) TransferAsset(ctx contractapi.TransactionContextInterface, id string, newOwner string) (string, error) {
	asset, err := s.ReadAsset(ctx, id)
	if err != nil {
		return "", err
	}

	oldOwner := asset.Owner
	asset.Owner = newOwner

	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return "", err
	}

	err = ctx.GetStub().PutState(id, assetJSON)
	if err != nil {
		return "", err
	}

	return oldOwner, nil
}

// API Connections

func (s *SmartContract) GetAllAssets(ctx contractapi.TransactionContextInterface) ([]*Asset, error) {
	// range query with empty string for startKey and endKey does an
	// open-ended query of all assets in the chaincode namespace.
	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	var assets []*Asset
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var asset Asset
		err = json.Unmarshal(queryResponse.Value, &asset)
		if err != nil {
			return nil, err
		}
		assets = append(assets, &asset)
	}

	return assets, nil
}
